/**
 * Adds a callback to the return method to an asyncIterator, for unsubscribing from a subscription.
 * @param asyncIterator
 * @param onCancel callback added to to the body of the return method of the wrapped asyncIterator
 */
export default function withCancel<T>(
  asyncIterator: AsyncIterator<T | undefined>,
  onCancel: () => void
): AsyncIterator<T | undefined> {
  if (!asyncIterator.return) {
    asyncIterator.return = () =>
      Promise.resolve({ value: undefined, done: true });
  }

  const savedReturn = asyncIterator.return.bind(asyncIterator);

  asyncIterator.return = () => {
    onCancel();
    return savedReturn();
  };

  return asyncIterator;
}
