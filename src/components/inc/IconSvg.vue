<template>
    <svg v-if="type === 'arrow-left'" xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20">
        <path
            d="M11.001.985a1.25 1.25 0 00-1.77 0l-8.31 8.31a.996.996 0 000 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77l-7.24-7.25 7.25-7.25c.48-.48.48-1.28-.01-1.76z"
        />
    </svg>
    <svg v-else-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21">
        <circle transform="matrix(-1 0 0 1 10.5 10.5)" fill="#16C8B2" r="10.5" />
        <path d="M6 10.667l2.68 3.666L14.707 8" stroke="#fff" stroke-width="2.2" fill="none" />
    </svg>
    <svg
        v-else-if="type === 'processing'"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
    >
        <path d="M12 2a10 10 0 108.76 14.83L12 12V2z" fill="#FFD83D" />
    </svg>
    <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21">
        <path
            d="M10.5 0a10 10 0 100 20 10 10 0 100-20zm4.3 14.3a1 1 0 01-1.41 0l-2.89-2.89-2.89 2.89a1 1 0 11-1.41-1.41L9.09 10 6.2 7.11A1 1 0 117.61 5.7l2.89 2.89 2.89-2.89a1 1 0 111.41 1.41L11.91 10l2.89 2.89c.38.38.38 1.02 0 1.41z"
            fill="#FF5942"
        />
    </svg>
    <svg v-else-if="type === 'cross'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="13" height="13">
        <path
            d="M7.616 6.5l4.196-4.188a.795.795 0 00-1.124-1.124L6.5 5.384 2.312 1.188a.795.795 0 00-1.124 1.124L5.384 6.5l-4.196 4.188a.792.792 0 00.258 1.297.793.793 0 00.866-.173L6.5 7.616l4.188 4.196a.793.793 0 001.297-.258.79.79 0 00-.173-.866L7.616 6.5z"
        />
    </svg>
    <svg v-else-if="type === 'search'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path
            d="M12.98 11.47h-.8l-.27-.27a6.5 6.5 0 10-.7.7l.27.28v.8l4.25 4.24a1.06 1.06 0 001.49-1.49l-4.24-4.26zm-6 0a4.5 4.5 0 11-.02-8.99 4.5 4.5 0 01.02 9z"
        />
    </svg>
    <svg v-else-if="type === 'preloader'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
        <g transform="translate(2 1)" stroke="#FFF" stroke-width="1.5" fill="none" fill-rule="evenodd">
            <circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="#fff">
                <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="1;0;0;0;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="#fff">
                <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;1;0;0;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="#fff">
                <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;1;0;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="#fff">
                <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;1;0;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="#fff">
                <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;1;0;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="#fff">
                <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;0;1;0;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="#fff">
                <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;0;0;1;0"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="27" cy="5" r="5" fill-opacity="0" fill="#fff">
                <animate
                    attributeName="fill-opacity"
                    begin="0s"
                    dur="1.3s"
                    values="0;0;0;0;0;0;0;1"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </circle>
        </g>
    </svg>
    <svg v-else-if="type === 'BTC'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
        <path d="M41.37 26.08A21 21 0 11.63 15.92a21 21 0 0140.74 10.16z" fill="#F7931A" />
        <path
            d="M30.26 18c.42-2.79-1.71-4.29-4.62-5.3l.94-3.78-2.3-.57-.92 3.69c-.6-.16-1.23-.3-1.85-.44l.93-3.7-2.3-.58-.95 3.78-1.47-.35-3.17-.8-.62 2.46s1.71.4 1.68.42c.93.23 1.1.85 1.07 1.34l-1.07 4.31.24.08-.25-.06-1.5 6.04c-.12.28-.4.7-1.06.55.02.03-1.68-.42-1.68-.42l-1.14 2.63 3 .75 1.64.43-.95 3.83 2.3.57.94-3.79 1.84.48-.94 3.77 2.3.57.96-3.82c3.93.74 6.88.44 8.13-3.11 1-2.86-.05-4.51-2.12-5.59 1.5-.35 2.64-1.34 2.94-3.38zm-5.27 7.4c-.7 2.85-5.53 1.3-7.09.92l1.27-5.07c1.56.39 6.57 1.16 5.82 4.14zm.72-7.43c-.65 2.6-4.66 1.28-5.96.95l1.14-4.6c1.3.33 5.5.93 4.82 3.65z"
            fill="#fff"
        />
    </svg>
</template>

<script>
export default {
    props: {
        type: {
            require: true,
            type: String,
        },
    },
};
</script>
