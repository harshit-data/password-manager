import React from "react";

const Footer = () => {
  return (
    <div>
      <footer class="bg-slate-800 text-white p-4">
        <div class="container mx-auto text-center">
          <p class="mb-6">© 2024 PassOp</p>
          <div class="flex justify-center space-x-4">
            <a href="#" class="hover:text-green-500">
              Privacy Policy
            </a>
            <a href="#" class="hover:text-green-500">
              Terms of Service
            </a>
            <a href="#" class="hover:text-green-500">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
