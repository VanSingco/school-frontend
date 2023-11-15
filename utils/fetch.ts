import { FetchOptions } from "ohmyfetch";

const csrf_cookie: string = "XSRF-TOKEN";

/**
 * Return the cookies needed by "Sanctum", browser will handle them automatically.
 */
export const useFetchCookies = async () => {
    const config = useRuntimeConfig();
	await $fetch.raw("/sanctum/csrf-cookie", {
		baseURL: config.public.apiBase,
		credentials: "include" // Allow browser to handle cookies
	});
};

/**
 * Api call using nuxt `useFetch`
 *
 * @see {@link https://github.com/unjs/ohmyfetch#readme} ~ ohmyfetch Docs
 * @param url
 * @param options
 */
export const useFetchApi = async (url: string, options?: FetchOptions) => {
	// First we verify if the `xsrf-token` is present on the browser cookies
	const access_token = useCookie('access_token');
	
	// await useFetchCookies();
	
	// if (!token) {
	// 	// If not present we will re fetch all cookies, the browser will
	// 	// handle them automatically so we don't need to do anything
	// 	// Load the new token value to use it in the `headers`
		
	// 	token = useCookie(csrf_cookie).value as string;
	// }

	// Here we will create a default set of headers for every request
	// if present we will also spread the `headers` set by the user
	// then we will delete them to avoid collision in next spread
	const headers: HeadersInit = {
		Accept: "application/json",
		Authorization: `Bearer ${access_token.value}`,
		...options?.headers
	};
	// At this point all the `headers` passed by the user where correctly
	// set in the defaults, now we will spread `options` to remove the
	// `headers` attribute so we don't spread it again in `useFetch`
	const opts = options ? (({ headers, ...opts }) => opts)(options) : null;

	const config = useRuntimeConfig();

	return useFetch(url, {
		baseURL: config.public.apiBase,
		credentials: "include", // Allow browser to handle cookies
		headers,
		...opts
	});
};