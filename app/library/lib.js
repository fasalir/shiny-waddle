var exports = module.exports = {};

// response handler

exports.errMsg = function(err, check){
	if (check != 'mongoError'){
		var errMsg = {
			'100'		: 'Data tidak ditemukan',
			'101'		: 'Email atau password salah',
			'102'		: 'Anda harus melampirkan gambar',
			'103'		: 'Silahkan login untuk mengakses halaman ini',
			'104'		: 'Silahkan masukkan data dengan lengkap',
			'105'		: 'Email sudah digunakan',
			'106'		: 'Maaf anda tidak dapat melakukan perubahan pada data user lain',
			'107'		: 'Tolong lengkapi data pribadi anda, dan kirim kode verifikasi merchant untuk menambah produk',
			'108'		: 'Tidak ada keranjang belanja',
			'109'		: 'Anda belum login',
			'110'		: 'Produk yang anda pilih tidak tersedia',
			'111'		: 'Sisa produk tersedia kurang dari jumlah pesanan anda',
			'112'		: 'Produk tidak ditemukan',
			'113'		: 'Silahkan masukkan tags',
			'114'		: 'Review hanya untuk customer yang pernah membeli produk terkait',
			'115'		: 'Order atau keranjang belanja tidak ditemukan',
			'116'		: 'Jumlah pembelian produk tidak valid',
			'117'		: 'Data tidak valid',
			'118'		: 'Email belum terdaftar',
			'119'		: 'Password dan konfirmasi password tidak sama',
			'120'		: 'Diskon tidak valid',
			'121'		: 'Ekstensi file yang diperbolehkan: jpeg, jpg, png, bmp, gif, tiff',
			'122'		: 'Tidak dapat menambah produk, data merchant belum lengkap',
			'123'		: 'Tidak bisa meng-edit keranjang belanja user lain',
			'124'		: 'Anda tidak bisa mengakses halaman ini',
			'125'		: 'Token expired',
			'126'		: 'No token provided.',
			'127'		: 'Token balcklisted',
			'128'		: 'Tidak ada opsi pengiriman',
			'129' 		: 'Produk ini sedang ada di cart, tidak dapat dihapus',

			'500'		: 'Something went wrong',
			'600'		: 'Parameter dikirim untuk fungsi array_replace_recursive harus minimal 2 array'
		};
	}else{
		var errMsg;
		if (err.kind != null || err.kind !== undefined){
			if (err.kind == 'ObjectId'){
				if (err.path == '_id'){
					errMsg = 'Data tidak ditemukan';
				}else{
					errMsg = err.message;
				}
			}else{
				errMsg = err.message;
			}
		}else{
			errMsg = err.message;
		}
	}

	return msg = {code:500, data:null, status:'error', message:errMsg};
}