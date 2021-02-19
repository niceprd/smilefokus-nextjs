import React, { Component } from "react";
import Router, { useRouter } from "next/router";

export default function Error404(url) {
  const router = useRouter();

  return (
    <div className="text-center mt-5">
      <div>
        ERROR: 404 - Not found page for
        <span className="text-red-500">{router.asPath}</span>
      </div>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => Router.back()}
      >
        ย้อนกลับ
      </button>
    </div>
  );
}
