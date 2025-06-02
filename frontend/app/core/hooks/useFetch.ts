import {useEffect, useState} from "react";
import {ApiError, ErrorCode} from "~/typing/app";
import {useTranslation} from "react-i18next";

export default function useFetch<T>({ query }: Args<T>) {
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const {t} = useTranslation()

    useEffect(() => {
        (async function () {
            try {
                setLoading(true)
                const res = await query()
                setData(res)
            } catch(e) {
                if (e instanceof ApiError) {
                    setError(t(`error.${e.code}`))
                }
            }
            finally {
                setLoading(false)
            }
        })()
    }, []);

    return {loading, data, setData, error}
}

type Args<T> = {
    query: () => Promise<T>
}