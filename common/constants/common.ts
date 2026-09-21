export const PATTERN_VALIDATE = {
  website: {
    value:
      /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
    message: 'Invalid website format',
  },
  facebook: {
    value:
      /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/i,
    message: 'Invalid Facebook URL format',
  },
  phone: {
    value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    message: 'Invalid phone number format',
  },
  instagram: {
    value: /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_]+)/im,
    message: 'Invalid Instagram URL format',
  },
  youtube: {
    value: /(https?:\/\/)?(www\.)?youtube\.com\/(channel|user)\/[\w-]+/,
    message: 'Invalid Youtube URL format',
  },
  tiktok: {
    value: /(?:(?:http|https):\/\/)?(?:www.)?tiktok\.com\/(@[\w-]+)/im,
    message: 'Invalid Tiktok URL format',
  },
  email: {
    value:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    message: 'Invalid email address format',
  },
  twitter: {
    value:
      /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/,
    message: 'Invalid Twitter URL format',
  },
  email_phone: {
    value: /^([0-9]{9})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/,
    message: 'Invalid email address or phone number !',
  },
  link: {
    value: /^https?:\/\/([a-z0-9\-_]+\.)+([a-z0-9]+\.?)+.*$/i,
    message: 'Invalid link format',
  },
  content: {
    // value: /^(?:.*>[^<].*|[^>]+)$/,
    value: /(^(?:.*>[^<].*|[^>]+)|(<img([\w\W]+?)))$/,
    message: 'This field is required',
  },
  isBlank: {
    value: /.*\w+.*/,
    message: 'This field is required',
  },
  password: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/,
    message:
      'Password must be at least 8 characters and include a mix of lowercase letters and numbers',
  },
  phoneNumber: {
    value: /^\d+$/,
    message: 'Invalid phone number format',
  },
};

export const STEP_FORGOT_PASSWORD = {
  sendEmail: 'SEND_EMAIL',
  verificationCode: 'VERIFICATION_CODE',
  changePassword: 'CHANGE_PASS',
  success: 'SUCCESS',
};
