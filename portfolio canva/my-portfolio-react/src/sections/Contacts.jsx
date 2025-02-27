export default function Contact() {
    return (
      <div className="h-full  flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Contact</h1>
          <form className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Your Name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg" placeholder="Your Email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea className="w-full px-4 py-2 border rounded-lg" rows="5" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  }