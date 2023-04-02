//<reference types="vite/client" />

declare module '*.vue' {
    import { defineComponent } from 'vue'
    //  const component: ReturnType<typeof defineComponent>
    const component: DefineComponent<{}, {}, any>
    export default component
}
