import React from 'react';
import QueueItem from './QueueItem';

const QueueList = ({
    queues,
    onEnqueue,
    onDequeue
}) => (
    <ul>
        {queues.map(queue => (
            <QueueItem 
                key={queue.uid}
                queue={queue}
                onEnqueue={onEnqueue}
                onDequeue={onDequeue}/>
        ))}
    </ul>
);

export default QueueList;