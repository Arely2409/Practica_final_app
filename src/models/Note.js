import { Schema, model } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      requiered: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Note", NoteSchema);
