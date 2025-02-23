**Project Name:** PDflip

**Project Description:**  
Build a web application that allows users to upload a PDF and view it as an interactive flipbook. The flipbook will display the PDF in the form of a book with a flip-page animation and generate a unique shareable view link. The application should be optimized for fast PDF loading and minimal dependencies.

**Core Functionalities:**

1. **Landing Page:**  
   - **Hero Section:** Introduce the project with a clear call-to-action ("Upload Your PDF").  
   - **How-to Section:** Brief instructions on how to use the application.  
   - **Footer:** Display a copyright bar with “Developed By @RelaxKartikey”.

2. **Header (Common across Pages):**  
   - Displays the project title.  
   - Includes a navigation button on the right that directs users to the Upload PDF page.

3. **Upload PDF Page:**  
   - Allow users to select and upload a PDF file.  
   - Display a progress animation during the upload process.  
   - Generate and show two links after a successful upload: a “Share Link” and a “View Link.”

4. **View Page:**  
   - Embed a PDF viewer that renders the uploaded PDF.  
   - Implement basic PDF functionalities including:  
     - **Zoom In/Out:** Ability to adjust the view scale.  
     - **Navigation:** Forward and backward page transitions.  
     - **(Future Enhancement):** Integrate a flip-page animation for a realistic book effect.

**Performance & Optimization Requirements:**

- **Fast PDF Loading:**  
  - Optimize PDF files by compressing and removing unnecessary metadata.  
  - Use progressive loading: render the first page immediately as a preview and load subsequent pages in the background.  
  - Utilize a lightweight PDF rendering library (e.g., PDF.js) that supports lazy loading and caching.  
  - Consider hosting PDF files on a CDN and implement browser caching strategies using service workers and HTTP caching headers.

- **Efficient Code Management:**  
  - Use code splitting and lazy-load non-critical components to reduce initial load times.

**Tech Stack:**

- **Frontend & Routing:** Next.js  
- **Styling:** Tailwind CSS (with a design system similar to Arcetinty UI but built solely with Tailwind CSS; text in black, background in white)  
- **Database & ORM:**  
  - Database: neon.tech powered ProgressSQL  
  - ORM: Prisma  
- **UI Components:** Custom components built using Tailwind CSS, following the design system guidelines.

**Additional Notes:**

- Maintain a component-based architecture for reusability and easy maintenance.
- Ensure responsiveness and cross-device compatibility.
- Prioritize minimal dependencies to keep the build lightweight and optimized.
- Security: Implement validations for PDF uploads to prevent malicious content.

---

This prompt should guide the coding editor AI to develop an optimized and performant version of the FLipPDF project with all the necessary functionalities and performance considerations.