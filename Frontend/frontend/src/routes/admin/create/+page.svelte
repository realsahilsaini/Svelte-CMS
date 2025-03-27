<script>
  import { goto } from '$app/navigation';
  import PostForm from '$lib/components/PostForm.svelte';
  import { createPost } from '$lib/api';
  
  async function handleSubmit(event) {
    try {
      const { post } = event.detail;
      console.log('Post', post);
      
      // Handle image upload if there is one
      let imageId = null;
      if (post.image) {
        const formData = new FormData();
        formData.append('files', post.image);
        
        //This will upload the image to the Strapi server
        const response = await fetch('http://localhost:1337/api/upload', {
          method: 'POST',
          //this will send the image as a file
          body: formData
        });
        
        const uploadResult = await response.json();
        console.log('Upload result:', uploadResult);
        if (uploadResult && uploadResult.length > 0) {
          imageId = uploadResult[0].documentId;
          console.log('Image uploaded:', imageId);
        }
      }
      
      console.log(post)

      // Create post
      const postData = {
        title: post.title,
        content: post.content,
        publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
        image: imageId ? imageId : undefined
      };

      console.log('Post data:', postData);
      
      await createPost(postData);
      
      alert('Post created successfully!');
      goto('/admin');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post: ' + error.message);
    }
  }
  
  function handleCancel() {
    goto('/admin');
  }
</script>

<svelte:head>
  <title>Create Customer | Admin | My CSM Application</title>
</svelte:head>

<div class="create-container">
  <h2 class="font-bold underline mt-8 mb-8">Create New Customer</h2>
  
  <PostForm 
    on:submit={handleSubmit} 
    on:cancel={handleCancel} 
  />
</div>

<style>
  .create-container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>