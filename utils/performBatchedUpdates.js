
import	ReactDOM	from	'react-dom';

function performBatchedUpdates(callback) {
	ReactDOM.unstable_batchedUpdates(() => {
		callback();
	});
}

export default performBatchedUpdates;