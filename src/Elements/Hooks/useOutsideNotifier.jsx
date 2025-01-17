import { useEffect } from "react";

/**
 * Hook that triggers a callback function when clicked outside of the passed ref
 */
function useOutsideNotifier(ref, callback) {
    useEffect(() => {
        /**
         * trigger callback when clicked outside of this element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default useOutsideNotifier;
