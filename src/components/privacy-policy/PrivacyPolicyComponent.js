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
            I use Yandex.Metrica to help me understand how my users use the
            Site. You can read more about how Yandex uses your Personal
            Information here:&nbsp;
            <a
              href='https://yandex.com/legal/confidential/'
              target='_blank'
              rel='noopener noreferrer'
              className='link z-0'>
              https://yandex.com/legal/confidential/
            </a>
            . You can also opt-out of Yandex.Metrica here:&nbsp;
            <a
              href='https://yandex.com/support/metrica/general/opt-out.html'
              target='_blank'
              rel='noopener noreferrer'
              className='link z-0'>
              https://yandex.com/support/metrica/general/opt-out.html
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
