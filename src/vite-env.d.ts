/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_AUTH_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
