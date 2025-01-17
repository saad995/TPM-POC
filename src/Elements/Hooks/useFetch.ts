import { useState, useEffect } from "react";
import { Post, postData } from "Lib/Net/PostRequest";
import _ from "lodash";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import { useDispatch } from "react-redux";
import { errorAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import { setToastr, ToasterTypes } from "Modules/Common/Helpers/ToastrConfig";

export default function useFetch(service: any, methodID: string, request?: any) {
    const [data, setData] = useState<any>();
    const [error, setError] = useState<IMessage>();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
   

    useEffect(() => {
        async function init() {
            try {
                const { data, error, message } = await postData(service, methodID, request);
                setMessage(message);

                if (message.code === "200") {
                    setData(data);
                } else {
                    setError(message);
                    dispatch(
                        setToastr({
                            title: "Error",
                            message: error.description ?? "Data could not be retrieved at the moment.",
                            type: ToasterTypes.ERROR
                        })
                    );
                }
            } catch (e) {
                setError(e as IMessage);
                    dispatch(
                        setToastr({
                            title: "Error",
                            message: e.description ?? "Data could not be retrieved at the moment.",
                            type: ToasterTypes.ERROR
                        })
                    );
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [methodID]);

    return { data, error, loading, message };
}