module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/data",
        destination:
          "https://wegivmerchantapp.firebaseapp.com/exam/bi-member-day-2020-04-01.json",
      },
    ];
  },
};
