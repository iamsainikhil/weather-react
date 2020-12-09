import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'

const PrivacyPolicyComponent = () => {
  const {colorTheme} = useContext(ThemeContext)
  return (
    <div className='flex justify-center'>
      <div
        className={`text-${colorTheme} p-2 sm:p-5 max-w-xs sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl`}>
        <h2 className='font-bold text-center'>Privacy Policy</h2>
        <div className='py-2 break-words text-sm'>
          <p>
            This privacy policy has been compiled to better serve those who are
            concerned with how their 'Personally Identifiable Information' (PII)
            is being used online. PII, as described in US privacy law and
            information security, is information that can be used on its own or
            with other information to identify, contact, or locate a single
            person, or to identify an individual in context. Please read this
            privacy policy carefully to get a clear understanding of how I
            collect, use, protect or otherwise handle your Personally
            Identifiable Information in accordance with
            https://iamsainikhil.github.io/weather-react (the “Site”).
          </p>
          <br />

          <h4 className='py-1 font-semibold'>PERSONAL INFORMATION I COLLECT</h4>
          <p>
            When you visit the Site, I automatically collect certain information
            about your device, including information about your web browser, IP
            address, time zone, and some of the cookies that are installed on
            your device. Additionally, as you browse the Site, I collect
            information about the individual web pages or products that you
            view, what websites or search terms referred you to the Site, and
            information about how you interact with the Site. I refer to this
            automatically-collected information as “Device Information.”
          </p>

          <h5 className='py-1'>
            I collect Device Information using the following technologies:
          </h5>
          <ul className='list-disc pl-6'>
            <li>
              “Cookies” are data files that are placed on your device or
              computer and often include an anonymous unique identifier. For
              more information about cookies, and how to disable cookies, visit
              <a
                href='http://www.allaboutcookies.org'
                target='_blank'
                rel='noopener noreferrer'>
                http://www.allaboutcookies.org
              </a>
              .
            </li>
            <li>
              “Log files” track actions occurring on the Site, and collect data
              including your IP address, browser type, Internet service
              provider, referring/exit pages, and date/time stamps.
            </li>
          </ul>

          <h5 className='py-1'>I use cookies to:</h5>
          <ul className='list-disc pl-6'>
            <li>
              Compile aggregate data about site traffic and site interactions in
              order to offer better site experiences and tools in the future. I
              may also use trusted third-party services that track this
              information on my behalf.
            </li>
            <li>
              You can choose to have your computer warn you each time a cookie
              is being sent, or you can choose to turn off all cookies. You do
              this through your browser settings. Since browser is a little
              different, look at your browser's Help Menu to learn the correct
              way to modify your cookies
            </li>
            <li>
              If you turn cookies off, It won't affect the user's experience .
            </li>
          </ul>
          <br />
          <h4 className='py-1 font-semibold'>
            HOW DO I USE YOUR PERSONAL INFORMATION?
          </h4>
          <p>
            I use the Device Information that I collect to help me screen for
            potential risk and fraud (in particular, your IP address), and more
            generally to improve and optimize my Site (for example, by
            generating analytics about how my customers browse and interact with
            the Site).
          </p>
          <br />
          <h4 className='py-1 font-semibold'>
            SHARING YOUR PERSONAL INFORMATION
          </h4>
          <p>
            I use Google Analytics to help me understand how my users use the
            Site--you can read more about how Google uses your Personal
            Information here:&nbsp;
            <a
              href='https://www.google.com/intl/en/policies/privacy/'
              target='_blank'
              rel='noopener noreferrer'
              className='link z-0'>
              https://www.google.com/intl/en/policies/privacy/
            </a>
            . You can also opt-out of Google Analytics here:&nbsp;
            <a
              href='https://tools.google.com/dlpage/gaoptout'
              target='_blank'
              rel='noopener noreferrer'
              className='link z-0'>
              https://tools.google.com/dlpage/gaoptout
            </a>
            .
          </p>
          <br />

          <h4 className='py-1 font-semibold'>
            HOW DO I PROTECT YOUR INFORMATION?
          </h4>
          <p>
            My website is scanned on a regular basis for security issues and
            known vulnerabilities in order to make your visit to my site as safe
            as possible.
          </p>
          <p>
            Your personal information is contained behind secured networks and
            is only accessible by a limited number of persons who have special
            access rights to such systems, and are required to keep the
            information confidential.
          </p>
          <p>
            In addition, all sensitive information you supply is encrypted via
            Secure Socket Layer (SSL) technology. I implement a variety of
            security measures when a user enters, submits, or accesses their
            information to maintain the safety of your personalinformation.
          </p>
          <br />
          <h4 className='py-1 font-semibold'>DO NOT TRACK</h4>
          <p>
            Please note that I do not alter my Site’s data collection and use
            practices when I see a Do Not Track signal from your browser.
          </p>
          <br />
          <h4 className='py-1 font-semibold'>
            California Online Privacy Protection Act
          </h4>
          <p>
            CalOPPA is the first state law in the nation to require commercial
            websites and online services to post a privacy policy. The law's
            reach stretches well beyond California to require any person or
            company in the United States (and conceivably the world) that
            operates websites collecting Personally Identifiable Information
            from California consumers to post a conspicuous privacy policy on
            its website stating exactly the information being collected and
            those individuals or companies with whom it is being shared. - See
            more at:{' '}
            <a
              href='http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf'
              target='_blank'
              rel='noopener noreferrer'
              className='link z-0'>
              http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf
            </a>
            .
          </p>
          <br />
          <h5 className='font-medium py-1'>
            According to CalOPPA, I agree to the following:
          </h5>
          <p>Users can visit my site anonymously.</p>
          <p>
            Once this privacy policy is created, I will add a link to it on my
            home page or as a minimum, on the first significant page after
            entering my website.
          </p>
          <p>
            You will be notified of any Privacy Policy changes:
            <ul className='list-disc pl-6'>
              <li>On my Privacy Policy page</li>
            </ul>
          </p>
          <p>
            Can change your personal information:
            <ul className='list-disc pl-6'>
              <li>By emailing me</li>
            </ul>
          </p>
          <br />
          <h4 className='py-1 font-semibold'>CAN SPAM ACT</h4>
          <p>
            The CAN-SPAM Act is a law that sets the rules for commercial email,
            establishes requirements for commercial messages, gives recipients
            the right to have emails stopped from being sent to them, and spells
            out tough penalties for violations.
          </p>
          <br />
          <h5 className='font-medium py-1'>
            I collect your email address when you share your feedback by
            including your email or email me through contact page in order to:
          </h5>
          <ul className='list-disc pl-6'>
            <li>Send feedback and/or other requests or questions</li>
          </ul>
          <h5 className='font-medium py-1'>
            To be in accordance with CANSPAM, I agree to the following:
          </h5>
          <ul className='list-disc pl-6'>
            <li>Not use false or misleading subjects or email addresses.</li>
            <li>
              Identify the message as an advertisement in some reasonable way.
            </li>
            <li>
              Include the physical address of our business or site headquarters.
            </li>
            <li>
              Monitor third-party email marketing services for compliance, if
              one is used
            </li>
            <li>Honor opt-out/unsubscribe requests quickly.</li>
            <li>
              Allow users to unsubscribe by using the link at the bottom of each
              email.
            </li>
          </ul>
          <h5 className='font-medium py-1'>
            If at any time you would like to unsubscribe from receiving future
            emails, you can email me at
          </h5>
          <ul className='list-disc pl-6'>
            <li>
              Follow the instructions at the bottom of each email and I will
              promptly remove you from ALL correspondence.
            </li>
          </ul>
          <br />
          <h4 className='py-1 font-semibold'>DATA RETENTION</h4>
          <p>
            The data I collection through google analytics will be stored for a
            maximum of 24 months and any comments data will be stored forever.
            However, your data is strictly secured and can only be accessed by
            me.
          </p>
          <br />
          <h4 className='py-1 font-semibold'>CHANGES</h4>
          <p>
            I may update this privacy policy from time to time in order to
            reflect, for example, changes to my practices or for other
            operational, legal or regulatory reasons.
          </p>

          <div className='divider text-center' data-content='OR'></div>
          <p>
            For more information about my privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            me by e-mail at&nbsp;
            <a
              href='mailto:contact@iamsainikhil.com'
              target='_blank'
              rel='noopener noreferrer'
              className='link z-0'>
              contact@iamsainikhil.com
            </a>
          </p>
          <br />
          <p>This policy is effective as of March 1st, 2020.</p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyComponent
