import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { useApi } from "../helper/api";
import { User } from "../helper/types";

export default function UserPage() {
  const { uid } = useParams();
  const { getUserByName: getUserByUID } = useApi();
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!uid) throw new Error("no uid detected");
      const res = await getUserByUID(uid);
      if (typeof res === "string") {
        setError(res);
      } else {
        setData(res);
      }
    })();
  }, [uid, getUserByUID]);

  if (!data && !error) return <LoadingPage text="getting user data..." />;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      <div>
        <textarea name="" id="" cols={50} rows={50}>
          {JSON.stringify(data)}
        </textarea>
      </div>
    </>
  );
}
