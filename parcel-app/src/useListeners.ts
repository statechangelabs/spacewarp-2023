import React, { useCallback, useMemo } from "react";
import { useAuthenticatedFetch, useAuthenticatedQuery } from "./Authenticator";
export type Listener = {
  id: number;
  name: string;
  url: string;
};
export type FSEvent = {
  id: number;
  created_at: number;
  data: Record<string, any>;
  listeners_id: number;
  _listeners: Listener;
};
export const useEvents = (id?: number) => {
  const fetch = useAuthenticatedFetch();
  const { data, error, loading, refresh } = useAuthenticatedQuery<FSEvent[]>(
    `/sent_webhooks?oracleId=${id || 0}`
  );
  const remove = useCallback(
    async (id: number) => {
      await fetch(`/requests/${id}`, {
        method: "DELETE",
      });
      refresh();
    },
    [fetch, refresh]
  );
  return useMemo(
    () => ({ data, error, loading, refresh, remove }),
    [data, error, loading, refresh, remove]
  );
};
