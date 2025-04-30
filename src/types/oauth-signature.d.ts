declare module 'oauth-signature' {
  interface GenerateOptions {
    encodeSignature?: boolean;
  }

  interface OAuthSignature {
    generate(
      method: string,
      url: string,
      parameters: Record<string, string>,
      consumerSecret: string,
      tokenSecret: string,
      options?: GenerateOptions
    ): string;
  }

  const oauthSignature: OAuthSignature;
  export default oauthSignature;
} 