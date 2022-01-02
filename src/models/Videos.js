import mongoose from "mongoose";

//스키마설정
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 20 },
  description: { type: String, required: true, trim: true, minlength: 10 },
  creationAt: { type: Date, default: Date.now(), required: true },
  hashtags: [{ type: String, trim: true }],
  fileUrl: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: `User` },
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

//데이터 전처리함수
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

//스키마를 사용하는 객체생성
const Video = mongoose.model("Video", videoSchema);

export default Video;
