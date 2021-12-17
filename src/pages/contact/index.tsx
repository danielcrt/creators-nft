import { NextPage } from "next";
import React, { ChangeEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { ContactBackground, ContactFormContainer, ContactGrid, Content, Wrapper, SuccessMessage } from "./contact.styles";
import SendPlaneLineIcon from 'remixicon-react/SendPlaneLineIcon'
import CheckLineIcon from 'remixicon-react/CheckLineIcon'
import { useRouter } from "next/router";
import { HR } from "../../common/styles";
import { createContactSubmission } from "../api/contactSubmission/contactSubmissions";
import { ContactForm, ResponseErrorMeta } from "../../types";

const Contact: NextPage = () => {
  const router = useRouter();
  const { assetId, assetName } = router.query;

  const [errors, setErrors] = useState<ResponseErrorMeta>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  const handleSubmit = async () => {
    setSubmitting(true);
    const response = await createContactSubmission({
      ...form,
      asset: assetId ? String(assetId) : undefined,
    });
    if (!response.error && !response.networkError) {
      setSuccess(true);
    } else if (response.error) {
      setErrors(response.error.meta);
      setSubmitting(false);
    }
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
    if (!assetName) {
      return null;
    }
    return <React.Fragment>
      <h2>Offer for: {assetName}</h2>
      <HR />
    </React.Fragment>
  }

  const _renderContactForm = () => {
    if (success) {
      return <SuccessMessage><CheckLineIcon /> Thank you for reaching out. We'll get back to you shortly.</SuccessMessage>
    }
    return <React.Fragment>
      {_renderContactFormTitle()}
      <Input name='name'
        label="Full name"
        type="text"
        placeholder="Your full name"
        value={form.name}
        onChange={handleChange}
        error={errors['name']} />
      <Input name='email' label="Email" type="email" placeholder="Your email" onChange={handleChange}
        value={form.email}
        error={errors['email']} />
      <TextArea name='message' label="Message" placeholder="Your message" rows={4} cols={50} onChange={handleChange}
        error={errors['message']} >
        {form.message}
      </TextArea>
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
          <ContactFormContainer>
            {_renderContactForm()}
          </ContactFormContainer>
        </Content>
      </ContactGrid>
    </Wrapper>
  );
}

export default Contact;