<script>
  import { createEventDispatcher } from 'svelte';
  
  export let post = {
    title: '',
    content: '',
    publishedAt: new Date().toISOString().split('T')[0]
  };
  export let isEditing = false;
  
  const dispatch = createEventDispatcher();
  
  let imageFile = null;
  let previewUrl = '';
  
  function handleSubmit() {
    dispatch('submit', {
      post: {
        ...post,
        image: imageFile
      }
    });
  }
  
  function handleImageChange(event) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      imageFile = file;
      previewUrl = URL.createObjectURL(file);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="post-form">
  <div class="form-group">
    <label for="title">Name</label>
    <input 
      type="text" 
      id="title" 
      bind:value={post.title} 
      required
      placeholder="Customer Name"
      class="border border-gray-300 p-2 w-full rounded-md" 
    />
  </div>
  
  <div class="form-group">
    <label for="content">Details</label>
    <textarea 
      id="content" 
      bind:value={post.content} 
      rows="10" 
      required
      placeholder="Write your post content here (Markdown supported)"
      class="border border-gray-300 p-2 w-full rounded-md"
    ></textarea>
  </div>
  
  <div class="form-group">
    <label for="publishedAt">Publish Date</label>
    <input 
      type="date" 
      id="publishedAt" 
      bind:value={post.publishedAt}
      class="border border-gray-300 p-2 w-fit rounded-md"
    />
  </div>
  
  <div class="form-group">
    <label for="image">Profile Image</label>
    <input 
      type="file" 
      id="image" 
      accept="image/*" 
      on:change={handleImageChange}
      class="border border-gray-300 p-2 rounded-md"
    />
    
    {#if previewUrl}
      <div class="image-preview">
        <img src={previewUrl} alt="Preview" />
      </div>
    {:else if post.image}
      <div class="image-preview bg-gray-300 w-fit p-2 rounded-md">
        <img 
          src={`http://localhost:1337${post.image}`} 
          alt="Current" 
        />
        <p class="text-center text-xs font-bold">Current image</p>
      </div>
    {/if}
  </div>
  
  <div class="form-actions">
    <button type="button" class="bg-red-800 text-white px-1.5 py-2 rounded-md" on:click={() => dispatch('cancel')}>
      Cancel
    </button>
    <button type="submit" class="bg-emerald-800 text-white px-1.5 py-2 rounded-md">
      {isEditing ? 'Update' : 'Create'} Post
    </button>
  </div>
</form>

<style>
  .post-form {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .image-preview {
    margin-top: 1rem;
  }
  
  .image-preview img {
    max-width: 100%;
    max-height: 300px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
  
</style>