import { REFRESH_FLASHCARD_KEY as REFRESH_CURRENT_FLASHCARD_KEY } from "@/__lib__/model";
import { useEffect, useState } from "react";

type PubsubSubscriberCallback = (topicId: string, args: unknown) => void;

type PubsubSubscriber = {
    token: string;
    callback: PubsubSubscriberCallback;
};

class Pubsub {
    internalToken = -1;
    topicMap: Record<
        string,
        PubsubSubscriber[]
    > = {};

    constructor() { }

    unsubscribe(topicId: string, subscriberToken: string) {
        if (this.topicMap[topicId]) {
            let subscriberIndex = this.topicMap[topicId].findIndex(subscriber => subscriber.token === subscriberToken);
            if (subscriberIndex >= 0) {
                this.topicMap[topicId].splice(subscriberIndex, 1);
                return true;
            }

            return false;
        }
        return false;
    }

    subscribe = (topicId: string, callback: PubsubSubscriberCallback) => {
        if (!this.topicMap[topicId]) {
            this.topicMap[topicId] = [];
        }

        const newToken = (++this.internalToken).toString();
        this.topicMap[topicId] = [
            ...this.topicMap[topicId],
            {
                token: newToken,
                callback: callback,
            },
        ];

        return () => this.unsubscribe(topicId, newToken);
    };

    publish(topicId: string, args?: unknown) {
        if (!this.topicMap[topicId]) {
            return false;
        }
        // use setTimeout to avoid blocking when callback function may cost time to process
        setTimeout(() => {
            this.topicMap[topicId].forEach(subscriber => subscriber.callback(topicId, args));
        }, 0);

        return true;
    };
}

const pubsubInstance = new Pubsub();

// export let pubsubInstance = {};
// (function (pubsubInstance: any) {
//     let interalToken = -1;
//     let topicMap: Record<
//         string,
//         PubsubSubscriber[]
//     > = {};

//     pubsubInstance.unsubscribe = (topicId: string, subscriberToken: string) => {
//         if (topicMap[topicId]) {
//             let subscriberIndex = topicMap[topicId].findIndex(subscriber => subscriber.token === subscriberToken);
//             if (subscriberIndex >= 0) {
//                 topicMap[topicId].splice(subscriberIndex, 1);
//                 return true;
//             }

//             return false;
//         }
//         return false;
//     };

//     pubsubInstance.subscribe = (topicId: string, callback: PubsubSubscriberCallback) => {
//         if (!topicMap[topicId]) {
//             topicMap[topicId] = [];
//         }

//         const newToken = (++interalToken).toString();
//         topicMap[topicId] = [
//             ...topicMap[topicId],
//             {
//                 token: newToken,
//                 callback: callback,
//             },
//         ];

//         return () => pubsubInstance.unsubscribe(topicId, newToken);
//     };

//     pubsubInstance.publish = (topicId: string, args: unknown) => {
//         if (!topicMap[topicId]) {
//             return false;
//         }
//         // use setTimeout to avoid blocking when callback function may cost time to process
//         setTimeout(() => {
//             topicMap[topicId].forEach(subscriber => subscriber.callback(topicId, args));
//         }, 0);

//         return true;
//     };
// })(pubsubInstance);

export const useSubscribe = (topicId: string, callback: PubsubSubscriberCallback) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const unsubscriber = pubsubInstance.subscribe(topicId, callback);
        setCounter(c => c + 1);

        return () => {
            unsubscriber();
        };
    }, [topicId]);

    return {
        counter,
    };
};

export const REFRESH_CURRENT_FLASHCARD = () => {
    pubsubInstance.publish(REFRESH_CURRENT_FLASHCARD_KEY);
};