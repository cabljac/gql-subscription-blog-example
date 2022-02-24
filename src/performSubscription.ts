const performSubscription = async (client, query: string) => {
  const events: any[] = [];

  return await new Promise<any[]>(async (resolve, reject) => {
    let unsubscribe = () => {
      console.log("not changed");
    };

    const onNext = (event: any) => {
      events.push(event);

      console.log(event);

      if (events.length === 1) {
        unsubscribe();
      }
    };

    unsubscribe = client.subscribe(
      {
        query,
      },
      {
        next: onNext,
        error: reject,
        complete: () => {
          console.log("Completed subscription");
          resolve(events);
        },
      }
    );
  });
};

export default performSubscription;
