export const SocialProviders = ["Github", "Linked In"];

export type SocialProvider = typeof SocialProviders[number];

export type SocialLink = {
    uri: string,
    provider: SocialProvider
}