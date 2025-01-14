type PubsubSubscriberCallback = (topicId: string, args: unknown) => void;

type PubsubSubscriber = {
    token: string;
    callback: PubsubSubscriberCallback;
};

export var pubsub = {};
(function (pubsubInstance: any) {
    let interalToken = -1;
    let topicList: Record<
        string,
        PubsubSubscriber[]
    > = {};

    pubsubInstance.unsubscribe = (topicId: string, subscriberToken: string) => {
        if (topicList[topicId]) {
            let subscriberIndex = topicList[topicId].findIndex(subscriber => subscriber.token === subscriberToken);
            if (subscriberIndex >= 0) {
                topicList[topicId].splice(subscriberIndex, 1);
                return true;
            }

            return false;
        }
        return false;
    };

    pubsubInstance.subscribe = (topicId: string, callback: PubsubSubscriberCallback) => {
        if (!topicList[topicId]) {
            topicList[topicId] = [];
        }

        const newToken = (++interalToken).toString();
        topicList[topicId] = [
            ...topicList[topicId],
            {
                token: newToken,
                callback: callback,
            },
        ];

        return pubsubInstance.unsubscribe(topicId, newToken);
    };

    pubsubInstance.publish = (topicId: string, args: unknown) => {
        if (!topicList[topicId]) {
            return false;
        }
        topicList[topicId].forEach(subscriber => subscriber.callback(topicId, args));
    };
})(pubsub);