import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginBtn = () => {
  const { status, data: session } = useSession();

  {
    session && (
      <>
        {status}
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>sign out</button>
      </>
    );
  }

  {
    !session && (
      <>
        {status}
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
};

export default LoginBtn;
