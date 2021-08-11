import styles from "./FormFieldError.module.css";

export default function FormFieldError({ message }) {
    return <div className={styles.formFieldError}><span>{message}</span></div>
}