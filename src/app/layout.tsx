import type { Metadata } from "next";
import {Rubik} from "next/font/google";
import "./globals.css";
import SessionWrapper from "./HOC/sessionWrapper";
const RubikFont=Rubik({preload:true,subsets:['latin']})
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en" className={`${RubikFont.className}`}>
      <body
        className={`antialiased`}
      >
        <SessionWrapper>
          {/* <WDYRWrapper> */}
        {children}
        {/* </WDYRWrapper> */}
        </SessionWrapper>
      </body>
    </html>
  );
}
