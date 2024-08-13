import axios from "axios";

import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  const { email } = await req.json();

  if (!email || !email.length) {
    return NextResponse.json(
      { error: "Prašome įvesti elektroninio pašto adresą" },
      { status: 400 }
    );
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const API_SERVER = process.env.MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: "subscribed",
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `api_key ${API_KEY}`,
    },
  };

  try {
    const response = await axios.post(url, data, options);

    if (response.status == 200) {
      NextResponse.json(
        { error: "Valio! Užsiprenumeratove sėkmingai!" },
        { status: 201 }
      );
    }

    return NextResponse.json(res);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `${error.response?.status}`,
        `${error.response?.data.title}`,
        `${error.response?.data.detail}`
      );

      if (error.response?.data.title === "Member Exists") {
        return NextResponse.json(
          { error: "Įvestas el.paštas jau registruotas sistemoje 🧐" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error:
            "Ups! Įvyko klaida bandant prenumeruoti. Prašome susisiekti su administracija dėl įtraukimo į prenumeratorių sąrašą.",
        },
        { status: 500 }
      );
    }
  }
}
