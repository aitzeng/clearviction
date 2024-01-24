'use client'

import React, { useState } from 'react';
import axios from 'axios';

const CreateForm = () => {

  const [email, setEmail] = useState('');
  const [githubURL, setGithubURL] = useState('');
  const [submitStatus, setSubmitStatus] = useState(0)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleGithubURLChange = (e) => {
    setGithubURL(e.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault();
    axios.post('https://cv-devs-temp-challenge.vercel.app/api/challenge', {
      email: `${email}`,
      githubRepoUrl: `${githubURL}`
    })
    .then((response) => {
      console.log(response.data.message)
      setSubmitStatus(1);
    })
    .catch((error) => {
      console.log('This is an error:', error)
      setSubmitStatus(2);
    })
  }

  return (
    <div className="h-screen items-center justify-center flex">
      <form className="border-2 border-gray-500">
        <div className="email-parent mx-2 my-2">
          <p>Email:</p>
          <input value={email} onChange={handleEmailChange} placeholder="john.doe@example.com" className="border-2 border-gray-300 rounded-md" />
        </div>
        <div className="github-url-parent mx-2 my-2">
          <p>Github Repo URL:</p>
          <input onChange={handleGithubURLChange} placeholder="github.com/username/example" className="border-2 border-gray-300 rounded-md"/>
        </div>
        {submitStatus === 1 ? <p className="mx-2 my-2 text-red-500">Submission successful</p> : submitStatus === 2 ? <p className="mx-2 my-2 text-red-500">Error submitting</p> : null}
        <button onClick={submitForm} className="mx-2 my-2 border-2 border-gray-300" type="submit">Submit</button>
      </form>
    </div>
  )
};

export default CreateForm;