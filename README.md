# Filestream.Link
Submission to EthGlobal Spacewarp Hackathon 2023
https://filestream.link

Our Ethglobal submission page: https://ethglobal.com/showcase/filestream-link-48r33

## Why we built this
The best apps can react without requiring immediate user input. Filestream makes it easy for apps to subscribe to FVM for notifications sent to webhooks that can be managed by serverless functions or even no-code workflows like Zapier and Make.com. Filestream enables not just the next generation of dapps, but of automation connecting to decentralized storage. 

## How we built this
We wanted to make FVM easier to access for no-code, and we wanted to build  with no-code tools. We chose Xano as our no-code backend for managing the relationship with FVM to prove this out. 

As a result of using no-code, we had to study how the Lotus JSON-RPC API works because we couldn't just layer on an SDK. We were able to deploy nearly entirely with no-code. Only highly mathematical operations (such as keccak hashing) required a drop to an inline lambda. 

We also broke down mapping data to event inputs from first principles in no-code. This gave us a deeper understanding on how these systems work, and let us make an easier user experience - wins all around! 

Because we focused so much on making a no-code back-end and learning how to break down these pieces, we used some quick low-code to build the front end. The web app we built with Parcel and React on top of Tailwind UI for maximum speed while creating a pleasant user experience. We kept it simple so our users could focus on the experience of receiving the notifications. Finally, our main www site is hosted on umso.com to make it easy to communicate the value proposition, again without requiring a whole cycle of design and building. 

## Who we are
* @akshay-rakheja
* @rhdeck

