<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import PostForm from '$lib/components/PostForm.svelte';
  import { fetchPostById, updatePost } from '$lib/api';
  
  export let data;
  
  let post = null;
  let isLoading = true;
  let error = null;
  
  onMount(async () => {
    try {
      const result = await fetchPostById(data.id);
      
      // Format the data for the form
      post = {
        title: result.title,
        content: result.content[0].children[0].text || '',
        publishedAt: result.publishedAt 
          ? new Date(result.publishedAt).toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0],
        image: result.image.url
      };

      // console.log(post.image);
      
      isLoading = false;
    } catch (err) {
      error = err.message;
      isLoading = false;
    }
  });
  
  async function handleSubmit(event) {
    try {
      const { post: updatedPost } = event.detail;
      
      // Handle image upload if there is one
      let imageId = null;
      if (updatedPost.image && typeof updatedPost.image !== 'object') {
        // It's an existing image reference
        imageId = updatedPost.image.data?.id;
      } else if (updatedPost.image) {
        // It's a new file
        const formData = new FormData();
        formData.append('files', updatedPost.image);
        
        const response = await fetch('http://localhost:1337/api/upload', {
          method: 'POST',
          body: formData
        });
        
        const uploadResult = await response.json();
        if (uploadResult && uploadResult.length > 0) {
          imageId = uploadResult[0].id;
        }
      }
      
      // Update post
      const postData = {
        title: updatedPost.title,
        content: updatedPost.content,
        publishedAt: updatedPost.publishedAt ? new Date(updatedPost.publishedAt).toISOString() : null,
        image: imageId || undefined
      };
      
      await updatePost(data.id, postData);
      
      alert('Post updated successfully!');
      goto('/admin');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post: ' + error.message);
    }
  }
  
  function handleCancel() {
    goto('/admin');
  }
</script>

<svelte:head>
  <title>Edit Post | Admin | My CSM Application</title>
</svelte:head>

<div class="edit-container">
  <h2 class="text-2xl mt-8 mb-4 underline font-bold">Edit Post</h2>
  
  {#if isLoading}
    <p>Loading post...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
    <a href="/admin" class="button">Back to Admin</a>
  {:else if !post}
    <p class="error">Post not found</p>
    <a href="/admin" class="button">Back to Admin</a>
  {:else}
    <PostForm 
      post={post} 
      isEditing={true}
      on:submit={handleSubmit} 
      on:cancel={handleCancel} 
    />
  {/if}
</div>

<style>
  .edit-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .error {
    color: red;
    margin-bottom: 1rem;
  }
</style>