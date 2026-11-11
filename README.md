# eo-fe

Frontend luyện TOEIC (Next.js 12). API backend: [eo-be](https://github.com/NTrungHieu05/eo-be).

## Chạy local

Cần BE đang chạy tại `http://localhost:8080`.

```bash
npm install --legacy-peer-deps
npm run dev
```

Mở `http://localhost:3000`.

- Admin: `admin@toeic.local` / `Admin@123`
- Học viên: `user@toeic.local` / `User@123`
- Đăng ký xong đăng nhập được ngay. Không có bước OTP.
- Trang: `/welcome`, `/login`, `/signup`, `/`, `/practice/[slugTopic]`, `/study/[topicCode]/[examCode]`, `/test/practice`, `/user`, `/admin/user|skill|topic|exam|question`
- Thi thử: `/test/practice`. Đề đủ 100 câu nghe và 100 câu đọc dùng đồng hồ 120 phút và thang 10–990.

`API_URL` nằm trong `config.js`.
