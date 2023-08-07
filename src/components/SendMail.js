import React from "react";
import "../styles/sendMail.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../features/mailSlice";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function SendMail() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async(formData) => {
    console.log(formData);
    const docRef = await addDoc(collection(db, "email"), 
    {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp()
    }
    );
    dispatch(closeSendMessage());
    console.log("Document written with ID: ", docRef.id);
  };
  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail__close"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("to", {
            required: "To is Required!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please Enter A Valid Email!",
            },
          })}
          placeholder="To"
          type="email"
        />
        {errors.to && <p className="sendMail__error">{errors.to?.message}</p>}

        <input
          {...register("subject", {
            required: true,
          })}
          placeholder="Subject"
          type="text"
        />
        {errors.subject && (
          <p className="sendMail__error">Subject is Required!</p>
        )}

        <input
          {...register("message", {
            required: true,
          })}
          placeholder="Message..."
          type="text"
          className="sendMail__message"
        />
        {errors.message && (
          <p className="sendMail__error">Message is Required!</p>
        )}

        <div className="sendMail__options">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="sendMail__send"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
