// Variables for DOM elements
const createBlogBtn = document.querySelector('#create-blog-btn');
const blogModal = document.querySelector('#blog-modal');
const closeBtn = document.querySelector('.close');
const blogForm = document.querySelector('#blog-form');
const blogPosts = document.querySelector('#blog-posts');
const saveBlogBtn = document.querySelector('#save-blog-btn');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchHistory = document.querySelector('#search-history');

// Initialize an empty array to store the blog posts
let posts = [];

// Function to generate the HTML for a single blog post
function generateBlogPostHTML(post) {
	return `
		<article class="blog-post" data-id="${post.id}">
			<h2>${post.title}</h2>
			<p>${post.description}</p>
			<div class="blog-post-actions">
				<button class="edit-btn">Edit</button>
				<button class="delete-btn">Delete</button>
			</div>
		</article>
	`;
}

// Function to generate HTML for the search history
function generateSearchHistoryHTML(history) {
	return `
		<li><a href="#" class="search-history-item">${history}</a></li>
	`;
}

// Function to update the blog posts on the page
function renderBlogPosts() {
	// Generate HTML for all the blog posts in the posts array
	const blogPostHTML = posts.map(post => generateBlogPostHTML(post)).join('');

	// Add the generated HTML to the blog posts section
	blogPosts.innerHTML = blogPostHTML;

	// Attach event listeners to each blog post's edit and delete buttons
	const editBtns = document.querySelectorAll('.edit-btn');
	editBtns.forEach(editBtn => {
		editBtn.addEventListener('click', () => {
			// Get the ID of the blog post that was clicked
			const postId = editBtn.parentElement.parentElement.getAttribute('data-id');

			// Find the blog post with that ID in the posts array
			const post = posts.find(post => post.id === postId);

			// Pre-fill the blog form with the current title and description
			document.querySelector('#title').value = post.title;
			document.querySelector('#description').value = post.description;

			// Show the blog modal
			blogModal.style.display = 'block';

			// Add an event listener to the Save button to update the blog post
			saveBlogBtn.addEventListener('click', () => {
				// Get the updated title and description from the blog form
				const updatedTitle = document.querySelector('#title').value;
				const updatedDescription = document.querySelector('#description').value;

				// Update the post in the posts array
				post.title = updatedTitle;
				post.description = updatedDescription;

				// Re-render the blog posts
				renderBlogPosts();

				// Hide the blog modal
				blogModal.style.display = 'none';
			});
		});
	});

	const deleteBtns = document.querySelectorAll('.delete-btn');
	deleteBtns.forEach(deleteBtn => {
		deleteBtn.addEventListener('click', () => {
			// Get the ID of the blog post that was clicked
			const postId = deleteBtn.parentElement.parentElement.getAttribute('data-id');

			// Remove the blog post with that ID from the posts array
			posts = posts.filter(post => post.id !== postId);

			// Re-render the blog posts
			renderBlogPosts();
		});
	});
}

// Event listener for the blog form submit button
blogForm.addEventListener('submit', event => {
	event.preventDefault();

	// Get the input values from the
	// Generate a unique ID for the new blog post
	const id = Date.now().toString();

	// Get the title and description from the blog form
	const title = document.querySelector('#title').value;
	const description = document.querySelector('#description').value;

	// Create a new blog post object and add it to the posts array
	const newPost = { id, title, description };
	posts.push(newPost);

	// Re-render the blog posts
	renderBlogPosts();

	// Hide the blog modal
	blogModal.style.display = 'none';

	// Reset the blog form inputs
	blogForm.reset();
});

// Event listener for the Create Blog button
createBlogBtn.addEventListener('click', () => {
	// Show the blog modal
	blogModal.style.display = 'block';
});

// Event listener for the Close button on the blog modal
closeBtn.addEventListener('click', () => {
	// Hide the blog modal
	blogModal.style.display = 'none';
});

// Event listener for the search form submit button
searchForm.addEventListener('submit', event => {
	event.preventDefault();

	// Get the search query from the search input
	const searchQuery = searchInput.value;

	// Add the search query to the search history list
	searchHistory.innerHTML += generateSearchHistoryHTML(searchQuery);

	// Filter the posts array to only include posts that match the search query
	const filteredPosts = posts.filter(post => {
		return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.description.toLowerCase().includes(searchQuery.toLowerCase());
	});

	// Generate HTML for the filtered blog posts and update the page
	const filteredPostHTML = filteredPosts.map(post => generateBlogPostHTML(post)).join('');
	blogPosts.innerHTML = filteredPostHTML;
});

// Event listener for the search history links
searchHistory.addEventListener('click', event => {
	event.preventDefault();

	// Get the search query from the clicked search history link
	const searchQuery = event.target.textContent;

	// Update the search input value with the search query
	searchInput.value = searchQuery;

	// Filter the posts array to only include posts that match the search query
	const filteredPosts = posts.filter(post => {
		return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.description.toLowerCase().includes(searchQuery.toLowerCase());
	});

	// Generate HTML for the filtered blog posts and update the page
	const filteredPostHTML = filteredPosts.map(post => generateBlogPostHTML(post)).join('');
	blogPosts.innerHTML = filteredPostHTML;
});

// Render the initial state of the blog posts
renderBlogPosts();

function generateBlogPostHTML(post) {
    const createdAt = new Date(parseInt(post.id)).toLocaleString(); // Get the creation date and time of the post
  
    return `
      <div class="blog-post" data-id="${post.id}">
        <h2 class="blog-title">${post.title}</h2>
        <p class="blog-description">${post.description}</p>
        <div class="blog-info">
          <div class="blog-buttons">
            <button class="blog-edit-btn">Edit</button>
            <button class="blog-delete-btn">Delete</button>
          </div>
          <p class="blog-created-at">Created at ${createdAt}</p>
        </div>
      </div>
    `;
  }
  