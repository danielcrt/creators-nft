import { NextPage } from "next";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { ContactBackground, ContactForm, ContactGrid, Content, Wrapper, SuccessMessage } from "./contact.styles";
import SendPlaneLineIcon from 'remixicon-react/SendPlaneLineIcon'
import CheckLineIcon from 'remixicon-react/CheckLineIcon'
import { useRouter } from "next/router";
import { HR } from "../../common/styles";

const Contact: NextPage = () => {
  const router = useRouter();
  const { offer, name } = router.query;

  const [success, setSuccess] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const handleSubmit = () => {
    setSubmitting(true);
    setSuccess(true);
  }

  const _renderSendButton = () => {
    if (submitting) {
      return <p>Sending...</p>
    }
    return <Button
      variant='primary'
      icon={<SendPlaneLineIcon size={18} />}
      onClick={handleSubmit}>
      Send
    </Button>;
  }

  const _renderContactFormTitle = () => {
    if (!name) {
      return null;
    }
    return <React.Fragment>
      <h2>Offer for: {name}</h2>
      <HR />
    </React.Fragment>
  }

  const _renderContactForm = () => {
    if (success) {
      return <SuccessMessage><CheckLineIcon /> Thank you for reaching out. We'll get back to you shortly.</SuccessMessage>
    }
    return <React.Fragment>
      {_renderContactFormTitle()}
      <Input label="Full name" type="text" placeholder="Your full name" />
      <Input label="Email" type="email" placeholder="Your email" />
      <TextArea label="Message" placeholder="Your message" rows={4} cols={50} />
      <br />
      {_renderSendButton()}
    </React.Fragment>
  }
  return (
    <Wrapper>
      <ContactGrid>
        <ContactBackground>
          <img src='/assets/images/contact.jpeg' />
        </ContactBackground>
        <Content>
          <h1>Hi, 🖐</h1>
          <h3>We’re here to help and answer any question you might have.<br />
            We look forward to hearing from you 🙂</h3>
          <br />
          <ContactForm>
            {_renderContactForm()}
          </ContactForm>
        </Content>
      </ContactGrid>
    </Wrapper>
  );
}

export default Contact;