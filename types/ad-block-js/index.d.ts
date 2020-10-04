declare module 'ad-block-js' {
  namespace AdBlockJS {
    interface Client {
      add: (rule: string) => void;
      matches: (url: string) => boolean;
    }

    const create: () => Client;
  }

  export = AdBlockJS;
}
