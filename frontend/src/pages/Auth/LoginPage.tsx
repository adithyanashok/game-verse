import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { googleAuth, loginUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";
import AuthBanner from "./Components/AuthBanner";
import AuthContainer from "./Components/LoginContainer";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, accessToken } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      setEmail("");
      setPassword("");
      navigate("/", { replace: true });
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_14%_0%,rgba(0,212,255,0.16),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(182,255,59,0.08),transparent_24%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-3 py-6 sm:px-5 md:px-8 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-center gap-6 lg:grid-cols-[minmax(340px,0.95fr)_minmax(0,1.05fr)]">
        <AuthBanner />

        <AuthContainer
          email={email}
          error={error}
          loading={loading}
          password={password}
          setEmail={(e) => setEmail(e)}
          setPassword={(e) => setPassword(e)}
          handleSubmit={(e) => handleSubmit(e)}
          onGoogleAuthSuccess={async (credentialResponse) => {
            const resultAction = await dispatch(
              googleAuth({ token: credentialResponse.credential }),
            );

            if (googleAuth.fulfilled.match(resultAction)) {
              navigate("/", { replace: true });
            }
          }}
        />
      </div>
    </main>
  );
}
