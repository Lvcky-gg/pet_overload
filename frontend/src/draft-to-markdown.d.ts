declare module 'draftjs-to-markdown' {
    interface HashConfig {
        trigger: string;
        separator: string;
    }

    interface Config {
        blockTypesMapping?: Record<string, string>;
        emptyLineBeforeBlock?: boolean;
    }

    export default function draftToMarkdown(
        rawContentState: any,
        hashConfig?: HashConfig,
        config?: Config
    ): string;
}
