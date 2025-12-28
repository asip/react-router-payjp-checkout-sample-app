import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { Link, useLoaderData } from 'react-router';
// @ts-ignore
import PayjpCheckoutFunc from "../func/payjp_checkout_func";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router PAY.JP Sample App" },
    { name: "description", content: "Welcome to Function Component!" },
  ];
}

export async function loader(_: Route.LoaderArgs) {
  return {
    env: {
      PAYJP_PUBLIC_KEY: process.env.PAYJP_PUBLIC_KEY || '',
    },
  };
}

export default function Home() {
  const data = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  const payjpCheckoutProps = {
    dataKey: data.env.PAYJP_PUBLIC_KEY,
    dataText: 'クレジットカードで支払う',
    dataPartial: 'true',
    onCreatedHandler: onCreated,
    onFailedHandler: onFailed,
  }

  function onCreated(payload: any) {
    //console.log(payload)
    console.log(payload.token)
  }

  function onFailed(payload: any) {
    console.log(payload.message)
  }

  return (
    <div className="payjpButtonArea">
      <div>function component</div>
      <div><Link to="/class" >class component</Link></div>
      {/* <div><a href="/">class component</a></div> */}
      <PayjpCheckoutFunc {...payjpCheckoutProps} />
    </div>
  );
}
