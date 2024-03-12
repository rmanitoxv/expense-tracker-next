import { NextComponentType } from "next"
import "../app/globals.css"
import Header from "@/components/Header"
import { SessionProvider, useSession } from "next-auth/react"
import type { AppProps } from "next/app"
import { ReactNode } from "react"
import { Provider } from "react-redux"
import store from "./utils/store"
interface CustomAppProps extends AppProps {
  Component: NextComponentType & {
    auth?: boolean
  }
}

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {
  return (
    <main className="bg-slate-950 text-white font-inter h-screen flex flex-col overflow-y-auto">
      <SessionProvider session={session}>
        <Header />
        <Provider store={store}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Provider>
      </SessionProvider>
    </main>
  )
}

const Auth = ({ children }: { children: ReactNode }) => {
  const { status } = useSession({ required: true })
  if (status === "loading") {
    return <></>
  }
  return children
}
export default App
