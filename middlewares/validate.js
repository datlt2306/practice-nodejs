export const demoMiddleWare = (req, res, next) => {
    // cai dat firebase-admin
    // dùng firebase-admin để kiểm tra token từ client gửi lên
    // nếu là admin next()
    console.log(req);
    next();
}
