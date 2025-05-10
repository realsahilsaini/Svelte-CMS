<script>
  import { createEventDispatcher } from 'svelte';
  
  export let post = {
    title: '',
    content: '',
    transactionByMonth: {
      january: null,
      february: null,
      march: null,
      april: null,
      may: null,
      june: null,
      july: null,
      august: null,
      september: null,
      october: null,
      november: null,
      december: null
    },
    publishedat: new Date().toISOString().split('T')[0]
  };
  export let isEditing = false;
  
  const dispatch = createEventDispatcher();
  
  // let imageFile = null;
  // let previewUrl = '';
  
  function handleSubmit() {
    console.log('Post', post);
    dispatch('submit', {
      post: {
        ...post,
        // image: imageFile
      }
    });
  }
  
  // function handleImageChange(event) {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   if (file) {
  //     imageFile = file;
  //     previewUrl = URL.createObjectURL(file);
  //   }
  // }


  console.log('Post', post);
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
    <label for="content">Sales By Month</label>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="january">January</label>
        <input type="number" id="january" bind:value={post.transactionByMonth.january} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="february">February</label>
        <input type="number" id="february" bind:value={post.transactionByMonth.february} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="march">March</label>
        <input type="number" id="march" bind:value={post.transactionByMonth.march} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="april">April</label>
        <input type="number" id="april" bind:value={post.transactionByMonth.april} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="may">May</label>
        <input type="number" id="may" bind:value={post.transactionByMonth.may} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="june">June</label>
        <input type="number" id="june" bind:value={post.transactionByMonth.june} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="july">July</label>
        <input type="number" id="july" bind:value={post.transactionByMonth.july} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="august">August</label>
        <input type="number" id="august" bind:value={post.transactionByMonth.august} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="september">September</label>
        <input type="number" id="september" bind:value={post.transactionByMonth.september} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="october">October</label>
        <input type="number" id="october" bind:value={post.transactionByMonth.october} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="november">November</label>
        <input type="number" id="november" bind:value={post.transactionByMonth.november} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
      <div>
        <label for="december">December</label>
        <input type="number" id="december" bind:value={post.transactionByMonth.december} class="border border-gray-300 p-2 w-full rounded-md" />
      </div>
    </div>


  </div>
  
  <div class="form-group">
    <label for="publishedat">Publish Date</label>
    <input 
      type="date" 
      id="publishedat" 
      bind:value={post.publishedat}
      class="border border-gray-300 p-2 w-fit rounded-md"
    />
  </div>
  
  <!-- <div class="form-group">
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
  </div> -->
  
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