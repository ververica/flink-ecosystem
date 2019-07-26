import React, { FC, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components/macro";
import { createPortal } from "react-dom";
import { Container, Alert, Button } from "reactstrap";
import { useSessionStorage } from "react-use";
import { mediaLarge } from "client/helpers";

const CookieBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
`;

const CookieButtons = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1em;

  .btn + .btn {
    margin-top: 0.5em;
  }

  @media ${mediaLarge} {
    flex-direction: row;

    .btn + .btn {
      margin-left: 0.5em;
      margin-top: 0;
    }
  }
`;

export const CookieBanner: FC = () => {
  const [cookies, setCookie] = useCookies();
  const [declined, setDeclined] = useSessionStorage(
    "cookie-consent-declined",
    false
  );

  const div = document.createElement("div");
  document.body.appendChild(div);

  const handleConsentClick = () =>
    setCookie("consent", true, {
      maxAge: 60 * 60 * 24 * 365,
    });

  const handleDeclineClick = () => setDeclined(true);

  return cookies.consent || declined
    ? null
    : createPortal(
        <CookieBannerContainer>
          <Container>
            <Alert
              color="warning"
              className="mb-0 rounded-0 justify-content-between d-flex align-items-center"
            >
              <span>
                We use cookies for Google Analytics and Github logins.
              </span>

              <CookieButtons>
                <Button
                  color="danger"
                  outline
                  size="sm"
                  onClick={handleDeclineClick}
                >
                  Decline
                </Button>
                <Button color="success" size="sm" onClick={handleConsentClick}>
                  Accept
                </Button>
              </CookieButtons>
            </Alert>
          </Container>
        </CookieBannerContainer>,
        div
      );
};
