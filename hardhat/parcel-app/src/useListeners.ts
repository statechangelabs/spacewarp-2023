import React, { useCallback, useMemo } from "react";
import { useAuthenticatedFetch, useAuthenticatedQuery } from "./Authenticator";
export type FSListener = {
  id: number;
  name: string;
  url: string;
  topics: string[];
  fvm_addresses: string[];
  eth_addresses: string[];
  _abi?: {
    data: any;
  };
};
export const useCreateListener = () => {
  const fetch = useAuthenticatedFetch();
  const { refresh } = useListeners();
  return useCallback(
    async (options: { name: string; url: string; addresses: string[]; topics: []; abi?: any }) => {
      const response = await fetch(`/listeners`, {
        method: "POST",
        body: JSON.stringify(options),
      });
      if (response.status === 200) {
        refresh();
      } else {
        throw new Error(response.statusText);
      }
    },
    [fetch, refresh]
  );
};

export const useListeners = () => {
  const fetch = useAuthenticatedFetch();
  const { data, error, loading, refresh } = useAuthenticatedQuery<FSListener[]>("/listeners");
  const remove = useCallback(
    async (id: number) => {
      await fetch(`/listeners/${id}`, {
        method: "DELETE",
      });
      refresh();
    },
    [fetch, refresh]
  );
  return useMemo(
    () => ({ listeners: data, error, loading, refresh, remove }),
    [data, error, loading, refresh, remove]
  );
};
export const useListener = (id: number) => {
  const fetch = useAuthenticatedFetch();
  const { data, error, loading, refresh } = useAuthenticatedQuery<FSListener>(`/listeners/${id}`);
  const remove = useCallback(
    async (id: number) => {
      await fetch(`/listeners/${id}`, {
        method: "DELETE",
      });
      refresh();
    },
    [fetch, refresh]
  );
  const update = useCallback(
    async (options: {
      name: string;
      url: string;
      addresses: string[];
      topics?: string[];
      abi?: any;
    }) => {
      const response = await fetch(`/listeners/${id}`, {
        method: "POST",
        body: JSON.stringify(options),
      });
      if (response.status === 200) {
        refresh();
      } else {
        throw new Error(response.statusText);
      }
    },
    [fetch, id, refresh]
  );
  return useMemo(
    () => ({ listener: data, error, loading, refresh, remove, update }),
    [data, error, loading, refresh, remove, update]
  );
};

export type FSEvent = {
  id: number;
  created_at: number;
  data: Record<string, any>;
  listeners_id: number;
  _listeners: FSListener;
};
export const useEvents = (id?: number) => {
  const fetch = useAuthenticatedFetch();
  const { data, error, loading, refresh } = useAuthenticatedQuery<FSEvent[]>(
    `/sent_webhooks?listener_id=${id || 0}`
  );
  const remove = useCallback(
    async (id: number) => {
      await fetch(`/sent_webhooks/${id}`, {
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
