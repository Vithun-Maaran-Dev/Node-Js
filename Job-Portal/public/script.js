function toggleFileInput() {
     var role = document.getElementById("role").value;
     var fileInputContainer = document.getElementById("fileInputContainer");

     if (role === "J") {
          fileInputContainer.style.display = "block";
     } else {
          fileInputContainer.style.display = "none";
     }
}

document.getElementById("resume").addEventListener("change", function () {
     const file = this.files[0]; // Get the selected file
     const allowedTypes = ["application/pdf"];
     const maxSize = 2 * 1024 * 1024; // 2MB in bytes

     if (!file) {
          alert("Please select a file.");
          return;
     }

     if (!allowedTypes.includes(file.type)) {
          alert("Only PDF files are allowed.");
          this.value = ""; // Clear file input
          return;
     }

     if (file.size > maxSize) {
          alert("File size must be less than 2MB.");
          this.value = ""; // Clear file input
     }
});