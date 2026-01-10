import type { Route } from "./+types/home";
import { Link, useLoaderData } from 'react-router';
import PayjpCheckout from "../components/class/payjp-checkout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router PAY.JP Sample App" },
    { name: "description", content: "Welcome to Class Component!" },
  ];
}

export async function loader(_: Route.LoaderArgs) {
  return {
    env: {
      PAYJP_PUBLIC_KEY: process.env.PAYJP_PUBLIC_KEY || "",
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
      <div>class component</div>
      <div><Link to="/">function component</Link></div>
      {/* <div><a href="/func">function component</a></div> */}
      <PayjpCheckout {...payjpCheckoutProps} />
    </div>
  );
}
