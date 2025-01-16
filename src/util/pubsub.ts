type PubsubSubscriberCallback = (topicId: string, args: unknown) => void;

type PubsubSubscriber = {
    token: string;
    callback: PubsubSubscriberCallback;
};

export let pubsubInstance = {};
(function (pubsubInstance: any) {
    let interalToken = -1;
    let topicMap: Record<
        string,
        PubsubSubscriber[]
    > = {};

    pubsubInstance.unsubscribe = (topicId: string, subscriberToken: string) => {
        if (topicMap[topicId]) {
            let subscriberIndex = topicMap[topicId].findIndex(subscriber => subscriber.token === subscriberToken);
            if (subscriberIndex >= 0) {
                topicMap[topicId].splice(subscriberIndex, 1);
                return true;
            }

            return false;
        }
        return false;
    };

    pubsubInstance.subscribe = (topicId: string, callback: PubsubSubscriberCallback) => {
        if (!topicMap[topicId]) {
            topicMap[topicId] = [];
        }

        const newToken = (++interalToken).toString();
        topicMap[topicId] = [
            ...topicMap[topicId],
            {
                token: newToken,
                callback: callback,
            },
        ];

        return () => pubsubInstance.unsubscribe(topicId, newToken);
    };

    pubsubInstance.publish = (topicId: string, args: unknown) => {
        if (!topicMap[topicId]) {
            return false;
        }
        // use setTimeout to avoid blocking when callback function may cost time to process
        setTimeout(() => {
            topicMap[topicId].forEach(subscriber => subscriber.callback(topicId, args));
        }, 0);

        return true;
    };
})(pubsubInstance);

export const useSubscribe = () => {
    // @todo 
};